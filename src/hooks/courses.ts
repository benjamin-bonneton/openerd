import courses from "@json/courses.json";

export function getCourses() {
  return Object.entries(courses).map(([id, course]) => ({ ...course, id }));
}

export function getCourse(id: string) {
  return getCourses().find((course: any) => String(course.id) === id);
}
