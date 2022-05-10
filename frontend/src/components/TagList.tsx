import { ReactNode } from "react";
import { Tag as TagModel } from "shared";
import { Tag } from "./Tag";
import "./TagList.css";

interface Props {
  tags: TagModel[];
}

/**
 * An element containing a list of tags.
 */
export const TagList: React.FC<Props> = ({ tags }) => {
  const tagList: ReactNode[] = [];

  const innerTags = [...tags];
  innerTags.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  for (const tag of innerTags) {
    tagList.push(<Tag key={tag.name} tag={tag} />);
  }

  return <div className="tag_list">{tagList}</div>;
};
