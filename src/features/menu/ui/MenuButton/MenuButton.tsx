import { menuStore } from "@features";
import { IconButton } from "@ui";
import { observer } from "mobx-react-lite";

export const MenuButton = observer(() => {
  const {openToggle} = menuStore;

  return (
    <IconButton icon="menu" onClick={openToggle}/>
  )
})
