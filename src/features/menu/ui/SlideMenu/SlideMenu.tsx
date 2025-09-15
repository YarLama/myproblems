import { menuStore } from "@features";
import { observer } from "mobx-react-lite";

export const SlideMenu = observer(() => {

  const {isOpen, close} = menuStore;
  
  return (
    <div>
      {isOpen}
    </div>
  )
})
