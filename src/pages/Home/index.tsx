import {HTML5Backend} from "react-dnd-html5-backend";
// @ts-ignore
import styles from "./styles.module.css";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import {DndProvider} from "react-dnd";
import {saveUrlProtect} from "../../components/ProtectedRouteElement";


export const HomePage = () => {
  saveUrlProtect('/')

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </DndProvider>
  );
}
