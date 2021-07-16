import styled from "styled-components";

const Box = styled.div `
background: #fff;
border-radius: 8px;
padding: 16px;
border: 1px solid rgba(0,0,0,.2);

margin-bottom: 10px;
.boxLink{
    font-size: 14px;
    color: #000;
    text-decoration: none;
    font-weight: 800;
}
.title{
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
}
.subTitle{
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
}
.smallTitle{
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin-bottom: 20px; 
}

hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 1px solid rgba(0,0,0,.2);
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 5px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  button {
    border: 1px solid rgba(0,0,0,.2);
    padding: 8px 12px;
    color: #000;
    border-radius: 5px;
    background-color: #fff;
  }

  button:hover{
    box-shadow: 0px 0px 1.5px;
  }
`;

export default Box;