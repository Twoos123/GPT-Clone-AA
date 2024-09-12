import { Client } from ".";

declare global {
  interface Window { Gadget: typeof Client; }
}

const previousValue: any = window.Gadget;
window.Gadget = Client;
(window.Gadget as any).previousValue = previousValue;
