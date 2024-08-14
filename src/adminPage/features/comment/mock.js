import { http, HttpResponse } from "msw";

const sampleEventList = [
  {
    id: "HD_240909_001",
    name: "이벤트1",
  },
  {
    id: "HD_240909_002",
    name: "이벤트2",
  },
  {
    id: "HD_240909_003",
    name: "이벤트3",
  },
  {
    id: "HD_240909_004",
    name: "이벤트4",
  },
  {
    id: "HD_240909_005",
    name: "이벤트5",
  },
  {
    id: "HD_240909_006",
    name: "이벤트6",
  },
  {
    id: "HD_240909_007",
    name: "이벤트7",
  },
];

const handlers = [
  http.get("/api/v1/admin/events/hints", () =>
    HttpResponse.json(sampleEventList),
  ),
];

export default handlers;
