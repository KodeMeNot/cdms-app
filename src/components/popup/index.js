import { h } from 'preact';


/*
  created by: Abhishek
  created on: 18/02/2021
   - created popup for searching customer if not found displaying new customer form.
     and if customer found displaying his fields.
*/

export const Popup = ({title,children,popupDisplay,onClose}) =>{
  return (
    <div className={'popup '+ popupDisplay}>
      <header>
        <div className="popup-content">
          <h6>{title}</h6>
          <a class="close" onClick={onClose}>
              x
          </a>
        </div>
      </header>
      <hr/>
      { children }
    </div>
  );
};

export const PopupBody = ({children})=>{
  return (
    <section className="popup-body">
      {children}
    </section>
  );
};
