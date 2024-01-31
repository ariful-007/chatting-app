

const Button_v_1 = ({children}) => {
  return (
    <button className="Button_v_1">
      {children}
    </button>
  );
};

const Button_v_2 = ({children}) => {
  return (
    <button>
      {children}
    </button>
  );
};

export {Button_v_1,Button_v_2};