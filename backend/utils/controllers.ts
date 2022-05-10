import { Experience, TagName } from "shared";

/**
 * Helper method for filtering on group size. Must fit in the interval between minGroupSize and maxGroupSize.
 *
 * @param experience
 */
export function filterOnGroupSize(experience: Experience, groupSize?: number) {
  if (groupSize === undefined || groupSize === 0) return true;
  if (
    experience.minGroupSize <= groupSize &&
    experience.maxGroupSize >= groupSize
  ) {
    return true;
  }
  return false;
}

/**
 * Helper method for filtering on age. Must fit in the interval minAge, maxAge.
 *
 * @param experience
 */
export function filterOnAge(experience: Experience, age?: number) {
  if (
    age === undefined ||
    (experience.minAge <= age && experience.maxAge >= age)
  ) {
    return true;
  }
  return false;
}

/**
 * Helper method for filtering on tags - AND - filtering.
 *
 * @param experience
 */
export function filterOnTags(experience: Experience, tagNames?: TagName[]) {
  const experienceTagNames = experience.tags.map((tag) => tag.name);
  if (
    tagNames === undefined ||
    tagNames.every((tagName) => experienceTagNames.includes(tagName))
  ) {
    return true;
  }
  return false;
}
