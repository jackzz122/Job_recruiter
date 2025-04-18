type TagTypes =
  | "Users"
  | "Jobs"
  | "Comments"
  | "Majors"
  | "Reports"
  | "Pendings"
  | "Recruiter"
  | "Companies";
export const generateProvidesTags = <T, K extends TagTypes>(
  type: K,
  results: T[] | undefined,
  idSelector: (item: T) => string
) => {
  if (results && results.length > 0) {
    return [
      ...results.map((item) => ({ type, id: idSelector(item) })),
      { type, id: "LIST" },
    ];
  }
  return [{ type, id: "LIST" }];
};
