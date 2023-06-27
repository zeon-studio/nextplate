import { FC } from "react";
import type { IconType } from "react-icons";

type IconMap = Record<string, IconType>;

interface IDynamicIcon {
  icon: string;
  className?: string;
}

const iconLibraries: { [key: string]: IconMap } = {
  ai: require("react-icons/ai"),
  bs: require("react-icons/bs"),
  fa: require("react-icons/fa"),
  fa6: require("react-icons/fa6"),
  fi: require("react-icons/fi"),
  io5: require("react-icons/io5"),
  ri: require("react-icons/ri"),
  tb: require("react-icons/tb"),
  tfi: require("react-icons/tfi"),
};

const DynamicIcon: FC<IDynamicIcon> = ({ icon, ...props }) => {
  const IconLibrary = getIconLibrary(icon);
  const Icon = IconLibrary ? IconLibrary[icon] : undefined;

  if (!Icon) {
    return <span className="text-sm">Icon not found</span>;
  }

  return <Icon {...props} />;
};

const getIconLibrary = (icon: string): IconMap | undefined => {
  const libraryKey = [...icon].reduce((lib, letter, i) => {
    if (letter === letter.toUpperCase() && lib === "" && i > 0) {
      return icon.slice(0, i).toLowerCase();
    }
    return lib;
  }, "");

  return iconLibraries[libraryKey];
};

export default DynamicIcon;
