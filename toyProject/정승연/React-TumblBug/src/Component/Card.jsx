function Card({ project, img, index, style }) {
  return (
    <div
      className={`${style.width} ${style.flex} px-2 cursor-pointer ${style.maxWidth}`}
      onClick={() => {
        window.open(project.url);
      }}
    >
      <img
        className={`py-3 ${style.imgWidth} hover:scale-125 duration-100 `}
        src={process.env.PUBLIC_URL + `/images/${img}${index + 1}.jpg`}
      ></img>
      <div className={`py-3 ${style.titlePadding} ${style.titleWidth}`}>
        <div className={`${style.titleHeight}`}>
          <div className="w-full text-xs text-slate-500 hover:underline">
            {project.category}|{project.creator}
          </div>
          <div className={`text-sm font-bold text-ellipsis`}>
            {project.title}
          </div>
        </div>
        <div className="text-sm text-orange-700 font-bold py-1">
          {project.sponsorship_rate}%달성
        </div>
      </div>
    </div>
  );
}

export default Card;
