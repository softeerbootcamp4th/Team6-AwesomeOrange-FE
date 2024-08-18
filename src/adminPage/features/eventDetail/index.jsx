import {Link} from "react-router-dom";
import EventBaseDataRenderer from "./EventBaseDataRenderer.jsx";
import TitleContainer from "@admin/components/TitleContainer.jsx";
import Button from "@common/components/Button.jsx";

function EventDetail({ data }) {
  return <article className="flex flex-col gap-8 group relative">
    <TitleContainer>
      <h2 className="text-title-m font-bold">이벤트 상세정보</h2>
      <Link to="./edit"><Button>편집</Button></Link>
    </TitleContainer>
    <EventBaseDataRenderer {...data}/>
  </article>
}

export default EventDetail