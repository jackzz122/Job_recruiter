import { useSelector } from "react-redux";
import { CompanySaveItem } from "../components/CompanySaveItem";
import { selectUser } from "../../../../redux/feature/user/userSlice";
import { useEffect, useState } from "react";
import { CompanySaveResponse } from "../../../../types/UserType";
import { NotFoundList } from "../components/NotFoundList";

export const CompanySave = () => {
  const user = useSelector(selectUser);
  const [listCompany, setListCompany] = useState<CompanySaveResponse[]>([]);

  useEffect(() => {
    if (user) {
      setListCompany(
        (user?.listFavouritesCompanyID as CompanySaveResponse[]) || []
      );
    }
  }, [user]);
  if (!listCompany || listCompany?.length === 0) {
    return <NotFoundList title="company save" content="save company" />;
  }
  return (
    <>
      {listCompany.map((company, index) => (
        <CompanySaveItem key={index} company={company} />
      ))}
    </>
  );
};
