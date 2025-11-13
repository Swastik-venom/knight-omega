package helper

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/dto"
	"github.com/QuantumNous/new-api/relay/common"
	"github.com/gin-gonic/gin"
)

func ModelMappedHelper(c *gin.Context, info *common.RelayInfo, request dto.Request) error {
	// map model name
	modelMapping := c.GetString("model_mapping")
	common.SysLog(fmt.Sprintf("Model mapping config: %s", modelMapping))
	common.SysLog(fmt.Sprintf("Original model: %s", info.OriginModelName))
	
	if modelMapping != "" && modelMapping != "{}" {
		modelMap := make(map[string]string)
		err := json.Unmarshal([]byte(modelMapping), &modelMap)
		if err != nil {
			common.SysLog(fmt.Sprintf("Failed to unmarshal model mapping: %v", err))
			return fmt.Errorf("unmarshal_model_mapping_failed")
		}
		common.SysLog(fmt.Sprintf("Model map: %+v", modelMap))

		// 支持链式模型重定向，最终使用链尾的模型
		currentModel := info.OriginModelName
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
							return nil
						} else {
							info.IsModelMapped = true
							break
						}
					}
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
			common.SysLog(fmt.Sprintf("Model mapped to: %s", info.UpstreamModelName))
		}
	} else {
		// If no model mapping, use the original model name
		info.UpstreamModelName = info.OriginModelName
		common.SysLog(fmt.Sprintf("No model mapping, using original model: %s", info.UpstreamModelName))
	}
	
	// Always set the model name in the request
	if request != nil {
		request.SetModelName(info.UpstreamModelName)
		common.SysLog(fmt.Sprintf("Request model set to: %s", info.UpstreamModelName))
	}
	return nil
}
