import { http, HttpResponse } from "msw";

const handlers = [
  http.get("/api/v1/comment", async () => {
    return HttpResponse.json([
      { id:1, title: "로렘 입숨 돌로 싯 아멧, 컨섹테투르 어디피스싱 엘리트, 세드 두 에이우스모드 템포르 인시디던트 엇 레이보어 엣 돌로어 마그나 알리쿠아.", user: "김삡뺩" },
      { id:2, title: "엣 에님 어드 미님 베니암, 퀴스 노스트루드 엑서시테이션 울람코 라보리스 니시 엇 알리큎 엑스 에아 코모도 컨세콰트. 두이스 아우테 이루레 돌로르 인 레프레헨더릿 인 볼룹테이트 벨리트 에쎄 실룸 돌로르 에우 푸지아트 눌라 파리아투르.", user: "김궵뛟" },
      { id:3, title: "익셉투르 신트 오캐카트 큐피다타트 논 프로이던트, 선트 인 쿨파 퀴 에피시아 데세런트 몰리트 아님 이드 에슽 라보룸.", user: "김빕봡" },
      { id:4, title: "jk love", user: "크롱"},
      { id:5, title: "crong love", user: "JK"},
      { id:6, title: "익셉셔널 러브", user: "익셉션"},
      { id:7, title: "jk love", user: "크롱1"},
      { id:8, title: "crong love", user: "JK2"},
      { id:9, title: "익셉셔널 러브", user: "익셉션3"},
      { id:10, title: "jk love", user: "크롱4"},
      { id:11, title: "crong love", user: "JK5"},
      { id:12, title: "익셉셔널 러브", user: "익셉션6"},
      { id:13, title: "jk love", user: "크롱4"},
      { id:14, title: "crong love", user: "JK5"},
      { id:15, title: "익셉셔널 러브", user: "익셉션6"},
      { id:16, title: "jk love", user: "크롱4"},
      { id:17, title: "crong love", user: "JK5"},
      { id:18, title: "익셉셔널 러브", user: "익셉션6"},
      { id:19, title: "crong love", user: "JK5"},
      { id:25, title: "익셉셔널 러브", user: "익셉션6"},
    ]);
  }),
];

export default handlers;
