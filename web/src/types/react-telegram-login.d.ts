declare module 'react-telegram-login' {
  import { Component } from 'react';

  interface TelegramLoginProps {
    botName: string;
    dataOnauth?: (response: any) => void;
    usePic?: boolean;
    cornerRadius?: number;
    buttonSize?: number;
    requestAccess?: string;
    requestWrite?: boolean;
    size?: string;
    lang?: string;
    tag?: string;
  }

  interface TelegramLoginState {
    isLoaded: boolean;
  }

  export default class TelegramLoginButton extends Component<TelegramLoginProps, TelegramLoginState> {}
}