const RequestSuccesfull = ({ messagePopUp, urlicon, isShowingPopUp }) => {
  return (
    isShowingPopUp && (
      <section className="fixed h-auto z-50  top-24 right-[50px] bg-slate-600 rounded-md">
        <article className="grid place-items-center w-72 p-12 gap-10 ">
          <img className="w-20 h-20" src={urlicon} alt="" />
          <h1 className="text-3xl mx-auto">{messagePopUp}</h1>
        </article>
      </section>
    )
  );
};
export default RequestSuccesfull;
