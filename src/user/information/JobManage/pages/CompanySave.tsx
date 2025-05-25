import { useSelector } from "react-redux";
import { CompanySaveItem } from "../components/CompanySaveItem";
import { selectUser } from "../../../../redux/feature/user/userSlice";
import { useEffect, useState } from "react";
import { CompanySaveResponse } from "../../../../types/UserType";
import { NotFoundList } from "../components/NotFoundList";
import { PendingStatus } from "../../../../types/PendingStatus";

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
  if (
    !listCompany ||
    listCompany?.filter((company) => company.status === PendingStatus.APPROVED)
      .length === 0
  ) {
    return <NotFoundList title="company save" content="save company" />;
  }
  return (
    <>
      {listCompany
        .filter((company) => company.status === PendingStatus.APPROVED)
        .map((company, index) => (
          <CompanySaveItem key={index} company={company} />
        ))}
    </>
  );
};
