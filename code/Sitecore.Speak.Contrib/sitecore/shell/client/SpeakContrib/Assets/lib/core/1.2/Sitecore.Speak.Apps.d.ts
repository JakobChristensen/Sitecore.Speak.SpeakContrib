declare module SpeakApps {
    class PageBase {
        public Url: string;
        public PageModelKey: string;
        constructor(pageModelKey?: string);
        public showDialog(completed?: (PageBase?: any) => void, dialogOptions?: any): void;
        public open(completed?: (PageBase?: any) => void, target?: string, features?: string, replace?: boolean): void;
        public getOptions(): Object[];
        private parseMessage(e, completed?);
    }
}
declare module SpeakApps {
    class AppBase {
        public Url: string;
        public AppModelKey: string;
        constructor(appModelKey?: string);
        public showDialog(completed?: (AppBase?: any) => void, dialogOptions?: any): void;
        public open(completed?: (AppBase?: any) => void, target?: string, features?: string, replace?: boolean): void;
        public getOptions(): Object[];
        private parseMessage(e, completed?);
    }
}
declare module SpeakApps {
    class SystemEvents {
        constructor();
        private subscribe();
    }
}
declare module SpeakApps {
    class WindowsHost {
        public alert(text: string): void;
        public confirm(text: string): boolean;
        public close(): void;
        public open(url: string, target?: string, features?: string, replace?: boolean): void;
        public prompt(text: string, defaultValue?: string): string;
        public reload(forceGet?: boolean): void;
        public showModalDialog(url: string, dialogOptions?: any): void;
    }
}
declare module SpeakApps {
    class AppHostStatic {
        public Windows: WindowsHost;
        public Events: SystemEvents;
    }
    var AppHost: AppHostStatic;
}
