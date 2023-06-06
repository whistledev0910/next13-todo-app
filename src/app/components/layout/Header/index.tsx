import * as React from "react";
import Container from "../../container";
import Logo from "../../logo";
import Search from "../../search";
import Avatar from "../../avatar";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className="w-full z-10 shadow-sm">
      <div
        className="
    py-2
    border-b-[1px]
  "
      >
        <Container>
          <div
            className="
      flex
      flex-row
      items-center
      justify-center
      md:justify-between
      gap-3
      md:gap-0
    "
          >
            <Logo />
            <Search />
            <Avatar currentUser={null} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
