import Icon from "./Icon";

export default function Button({
  classType,
  iconName,
  label = "",
  title = "",
  type = "button",
  isDisabled = false,
  customClass = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={"btn btn-" + classType+" "+ customClass}
      {...props}
      title={title}
      disabled={isDisabled}
    >
      {iconName && (
        <Icon name={iconName} cssClass={label === "" ? undefined : "pe-2"} />
      )}
      {label}
    </button>
  );
}
