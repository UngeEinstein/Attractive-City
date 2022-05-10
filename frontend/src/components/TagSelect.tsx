import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import {
  extractTagName,
  Tag,
  tagListContains,
  TagName,
  tagValues,
} from "shared";
import { TagList } from "./TagList";
import "./TagSelect.css";

interface Props {
  handleAddTag: (tag: Tag) => void;
  handleResetTags: () => void;
  tags: Tag[];
}

/**
 * Component used to select a number of tags.
 */
export const TagSelect: React.FC<Props> = ({
  handleAddTag,
  handleResetTags,
  tags,
}) => {
  return (
    <div className="tag_select">
      <TagList tags={tags} />
      <div className="controls">
        <DropdownButton
          onSelect={(eventKey) => {
            handleAddTag(tagValues[eventKey as TagName]);
          }}
          title="Choose a tag"
          variant="light"
        >
          {Object.keys(tagValues).map((tagName) => {
            if (tagListContains(tagName as TagName, tags)) {
              return null;
            }

            const shortTagName = extractTagName(tagName as TagName);
            return (
              <Dropdown.Item eventKey={tagName} key={tagName}>
                {shortTagName}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <Button variant="secondary" onClick={handleResetTags}>
          Clear tags
        </Button>
      </div>
    </div>
  );
};
