type TagTypes =
  | "Users"
  | "Jobs"
  | "Comments"
  | "Majors"
  | "Reports"
  | "Pendings"
  | "Recruiter";
export const generateProvidesTags = <T, K extends TagTypes>(
  type: K,
  results: T[] | undefined,
  idSelector: (item: T) => string
) => {
  if (results) {
    return [
      ...results.map((item) => ({ type, id: idSelector(item) })),
      { type, id: "LIST" },
    ];
  }
  return [{ type, id: "LIST" }];
};
