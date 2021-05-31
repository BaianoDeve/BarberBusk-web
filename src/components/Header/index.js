import React from 'react';

const Header = () => {
  return (
    <header className="container-fluid  d-flex justify-content-end">
      <div className="d-flex aling-intems-center">
        <div>
          <span className="d-block m-0 p-0 text-white fw-bold">
            Barber Busk
          </span>
          <small className="m-0 p-0 text-white">Admin</small>
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNO86TFZJR2RvZJOUwPakThbofCuZiEHFQKQ&usqp=CAU" />
        <span className="mdi mdi-chevron-down text-white"></span>
      </div>
    </header>
  );
};

export default Header;
