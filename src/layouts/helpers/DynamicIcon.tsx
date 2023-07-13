import { FC } from "react";
import type { IconType } from "react-icons";
import * as FaIcons6 from "react-icons/fa6";
// import * as AiIcons from "react-icons/ai";
// import * as BsIcons from "react-icons/bs";
// import * as FiIcons from "react-icons/fi";
// import * as Io5Icons from "react-icons/io5";
// import * as RiIcons from "react-icons/ri";
// import * as TbIcons from "react-icons/tb";
// import * as TfiIcons from "react-icons/tfi";

type IconMap = Record<string, IconType>;

interface IDynamicIcon extends React.SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
}

const iconLibraries: { [key: string]: IconMap } = {
  fa: FaIcons6,
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
