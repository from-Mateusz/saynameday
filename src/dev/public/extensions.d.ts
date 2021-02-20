declare global {
    interface HTMLElement {
        appendChildren: (...children: Node[]) => void;
        clear: () => void;
        leaveParent: () => HTMLElement | null;
        isDisplayed: () => boolean;
        setDisplayed: (on: boolean) => void; 
    }
}

export {};


