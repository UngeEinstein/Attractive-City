import Badge from "react-bootstrap/Badge";
import {
  FaBuilding,
  FaChild,
  FaGlasses,
  FaGlobe,
  FaLeaf,
  FaMusic,
  FaSkiingNordic,
  FaTheaterMasks,
} from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { IoFastFood } from "react-icons/io5";
import { MdChildFriendly } from "react-icons/md";
import { GiParkBench, GiPerson } from "react-icons/gi";
import { RiBankFill } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import "./Tag.css";
import { extractTagName, TagName, Tag as TagModel } from "shared";

const iconMap = new Map<TagName, JSX.Element>();
iconMap.set("fit_for:adults", <GiPerson />); // 🚶‍♀️
iconMap.set("fit_for:children", <FaChild />); // 🤸‍♂️
iconMap.set("fit_for:elderly", <FaGlasses />); // 👴
iconMap.set("fit_for:families", <TiGroup />); // 👪
iconMap.set("fit_for:infants", <MdChildFriendly />); // 👶
iconMap.set("location:center", <FaGlobe />); // 🌆🏙
iconMap.set("location:suburban", <FaGlobe />); // 🏘🏡
iconMap.set("location:rural", <FaGlobe />); //
iconMap.set("price:free", <ImPriceTag />); //
iconMap.set("price:paid", <ImPriceTag />);
iconMap.set("culture", <FaTheaterMasks />);
iconMap.set("indoor", <FaBuilding />);
iconMap.set("museum", <RiBankFill />);
iconMap.set("music", <FaMusic />);
iconMap.set("nature", <FaLeaf />);
iconMap.set("outdoor", <GiParkBench />);
iconMap.set("restaurant", <IoFastFood />);
iconMap.set("sports", <FaSkiingNordic />);

interface Props {
  /**
   * Type of tag.
   */
  tag: TagModel;
}

/**
 * A small visual element representing one tag. Tags are associated with experiences to group them into categories and or communciate a common property.
 */
export const Tag: React.FC<Props> = ({ tag }) => {
  const tagTypeText = tag.name as TagName;

  const name = extractTagName(tagTypeText);

  return (
    <Badge className="tag">
      {iconMap.get(tag.name)}
      <span className="name">{name}</span>
    </Badge>
  );
};
