export default function Modal({
  header,
  openModal,
  setOpenModal,
  children,
  action,
}) {
  return (
    <>
      <style jsx>
        {`
          .animated {
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }

          .animated.faster {
            -webkit-animation-duration: 500ms;
            animation-duration: 500ms;
          }

          .fadeIn {
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
          }

          .fadeOut {
            -webkit-animation-name: fadeOut;
            animation-name: fadeOut;
            display: none;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes fadeOut {
            from {
              opacity: 1;
            }

            to {
              opacity: 0;
            }
          }
        `}
      </style>
      <div
        className={`main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center align animated faster ${
          openModal ? 'fadeIn' : 'fadeOut'
        }`}
        style={{ background: 'rgba(0,0,0,.7)' }}
      >
        <div className="border border-teal-500 modal-container bg-white w-5/12 mobile:w-5/6 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3 ml-2">
              <p className="text-2xl font-bold">{header}</p>
              <div className="modal-close cursor-pointer z-50">
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  onClick={() => setOpenModal(false)}
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>
            <div className="my-5">{children}</div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="focus:outline-none modal-close px-3 bg-gray-200 p-3 rounded-lg text-black hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={action}
                className=" focus:outline-none px-3 bg-blue-700 p-3 ml-3 rounded-lg text-white hover:bg-blue-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
