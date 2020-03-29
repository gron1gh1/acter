
import { Keyframes } from 'react-spring/renderprops';
import delay from 'await-delay';
// Creates a spring with predefined animation slots
export const Sidebar = Keyframes.Spring({
    // Slots can take arrays/chains,
    open: { delay: 0, x: 0 },
    // or async functions with side-effects
    close: async call => {
      await delay(100)
      await call({ delay: 0, x: -300 })
    },
  })
  
  // Creates a keyframed trail
  export const Content = Keyframes.Trail({
    open: { x: 0, opacity: 1, delay: 100 },
    close: { x: -100, opacity: 0, delay: 0 },
  });
  
  export const Layout_Ani = Keyframes.Spring({
    use: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    not_use: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    restore: async call => {
      await call({ transform: 'translate3d(-300px,0,0)', config: { duration: 0 } });
      await call({ from: { transform: 'translate3d(-300px,0,0)', opacity: 0 }, to: { transform: 'translate3d(0%,0,0)', opacity: 1 } })
  
    },
    mouse_down: {
      from: { opacity: 1 },
      to: { opacity: 0.5 },
    },
    mouse_up: {
      from: { opacity: 0.5 },
      to: { opacity: 1 },
    }
  
  })