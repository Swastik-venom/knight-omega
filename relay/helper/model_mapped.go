package helper

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/dto"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func ModelMappedHelper(c *gin.Context, info *relaycommon.RelayInfo, request dto.Request) error {
	logger := common.GetLogger()
	fields := []zap.Field{
		zap.String("original_model", info.OriginModelName),
		zap.String("endpoint", c.Request.URL.Path),
	}

	modelMapping := c.GetString("model_mapping")
	logger.Info("Starting model mapping", append(fields, zap.String("model_mapping", modelMapping))...)
	
	currentModel := info.OriginModelName

	if modelMapping != "" && modelMapping != "{}" {
		modelMap := make(map[string]string)
		err := json.Unmarshal([]byte(modelMapping), &modelMap)
		if err != nil {
			logger.Error("Failed to unmarshal model mapping", 
				append(fields, zap.Error(err))...)
			return fmt.Errorf("unmarshal_model_mapping_failed")
		}

		// 支持链式模型重定向，最终使用链尾的模型
		visitedModels := map[string]bool{
			currentModel: true,
		}
		for {
			if mappedModel, exists := modelMap[currentModel]; exists && mappedModel != "" {
				// 模型重定向循环检测，避免无限循环
				if visitedModels[mappedModel] {
					if mappedModel == currentModel {
						if currentModel == info.OriginModelName {
							info.IsModelMapped = false
							logger.Info("Model mapping not applied - same as original", fields...)
							return nil
						} else {
							info.IsModelMapped = true
							break
						}
					}
					logger.Error("Model mapping contains cycle", 
						append(fields, zap.String("current_model", currentModel), 
							zap.String("mapped_model", mappedModel))...)
					return errors.New("model_mapping_contains_cycle")
				}
				visitedModels[mappedModel] = true
				currentModel = mappedModel
				info.IsModelMapped = true
			} else {
				break
			}
		}
		if info.IsModelMapped {
			info.UpstreamModelName = currentModel
			logger.Info("Model mapping applied", 
				append(fields, zap.String("mapped_model", info.UpstreamModelName))...)
		}
	} else {
		// If no model mapping, use the original model name
		info.UpstreamModelName = info.OriginModelName
		logger.Debug("No model mapping applied", fields...)
	}
	
	// Always set the model name in the request
	if request != nil {
		request.SetModelName(info.UpstreamModelName)
		logger.Debug("Request model set", 
			append(fields, zap.String("request_model", info.UpstreamModelName))...)
	}
	return nil
}