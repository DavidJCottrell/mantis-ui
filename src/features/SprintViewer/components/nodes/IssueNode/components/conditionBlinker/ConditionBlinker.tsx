import "./ConditionBlinker.css";
export const ConditionBlinker = (props: any) => {
  const { condition } = props;

  const getConditionClass = (condition: string) => {
    switch (condition) {
      case "active":
        return "active";
      case "hold":
        return "onHold";
      case "blocked":
        return "blocked";
      default:
        return "";
    }
  };

  return <div className={"conditionBlinker " + getConditionClass(condition)} />;
};

export default ConditionBlinker;
