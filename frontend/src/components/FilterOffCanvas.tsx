import { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { Tag, tagListContains } from "shared";
import { FilterConfig } from "../views/TinderView";
import { TagSelect } from "./TagSelect";
import "./FilterOffCanvas.css";

interface Props {
  /**
   * The current filters.
   */
  filterConfig: FilterConfig;

  /**
   * Method used to set filters if they are changed.
   */
  handleReplaceFilters: (filterConfig: FilterConfig) => void;

  /**
   * A value indicating whether the OffCanvas should be open or not.
   */
  isShown: boolean;

  /**
   * Method used to set OffCanvas visibility.
   */
  setShown: (isShown: boolean) => void;
}

/**
 * OffCanvas – appearing side panel - to show and change a FilterConfig.
 */
export const FilterOffCanvas: React.FC<Props> = ({
  filterConfig,
  handleReplaceFilters,
  isShown,
  setShown,
}) => {
  const [ageValue, setAgeValue] = useState<{
    valid: boolean;
    value?: number;
  }>({ valid: true, value: filterConfig.age });

  const [groupSizeValue, setGroupSizeValue] = useState<{
    valid: boolean;
    value?: number;
  }>({ valid: true, value: filterConfig.groupSize });

  /**
   * Currently selected tags.
   */
  const [tags, setTags] = useState<Tag[]>(filterConfig.tags);

  /**
   * Clear all tags.
   */
  const handleResetTags = () => {
    setTags([]);
  };

  /**
   * Add supplied tag to selection if unique.
   */
  const handleAddTag = (tag: Tag) => {
    setTags((prevTags) => {
      const nextTags = [...prevTags];

      if (!tagListContains(tag.name, nextTags)) {
        nextTags.push(tag);
      }

      return nextTags;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!ageValue.valid) {
      return;
    }

    if (!groupSizeValue.valid) {
      return;
    }

    const filters = {
      age: ageValue.value,
      groupSize: groupSizeValue.value,
      tags: tags,
    };

    handleReplaceFilters(filters);
    setShown(false);
  };

  return (
    <Offcanvas
      className="filter_offcanvas"
      show={isShown}
      placement="end"
      onHide={() => {
        setShown(false);
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filters</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form className="filter_form" onSubmit={handleSubmit}>
          <Form.Group controlId="formAgeFilter">
            <Form.Label>Age</Form.Label>
            <Form.Control
              defaultValue={filterConfig.age?.toString()}
              isInvalid={!ageValue.valid}
              onChange={(e) => {
                const ageNumber = Number(e.currentTarget.value);
                const ageValue = !e.currentTarget.value ? undefined : ageNumber;
                setAgeValue({
                  valid: Number.isInteger(ageNumber) && 0 <= ageNumber,
                  value: ageValue,
                });
              }}
              type="number"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {"Age must be an integer over or equal to 0."}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formGroupSizeFilter">
            <Form.Label>Group size</Form.Label>
            <Form.Control
              defaultValue={filterConfig.groupSize?.toString()}
              isInvalid={!groupSizeValue.valid}
              onChange={(e) => {
                const groupSizeNumber = Number(e.currentTarget.value);
                const groupSizeValue =
                  groupSizeNumber === 0 ? undefined : groupSizeNumber;
                setGroupSizeValue({
                  valid:
                    Number.isInteger(groupSizeNumber) && 0 <= groupSizeNumber,
                  value: groupSizeValue,
                });
              }}
              type="number"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {"Group size must be a positive integer."}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <TagSelect
              handleAddTag={handleAddTag}
              handleResetTags={handleResetTags}
              tags={tags}
            />
          </Form.Group>
          <Button type="submit">Use filters</Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
