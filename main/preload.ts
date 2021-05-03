import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
  getProfileInfo: (args) => ipcRenderer.invoke("get-profile-details", args),
});
