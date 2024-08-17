import { http, HttpResponse } from "msw";
import { makeLorem } from "@common/mock/utils.js";

function getEventsDetailMock() {
  return new Map( Array.from({ length: 100 }, (_, i) => {
    const startTime = new Date(
      Date.now() -
        86400 * 30 * 1000 +
        Math.floor(Math.random() * 86400 * 60 * 1000),
    );
    const endTime = new Date(
      startTime.getTime() + Math.floor(Math.random() * 86400 * 120) * 1000,
    );
    const eventType = Math.random() > 0.5 ? "fcfs" : "draw";
    const eventId = `HD_240808_${i.toString().padStart(3, "0")}`;

    const result = {
      name: makeLorem(3, 7),
      description: makeLorem(5, 10),
      eventType,
      startTime,
      endTime,
      url: "https://www.naver.com/",
      eventFrameId: "the-new-ioniq-5",
      eventId,
    };

    if(eventType === "fcfs") {
      const sliceStartTime = new Date(startTime);
      sliceStartTime.setHours(0);
      sliceStartTime.setMinutes(0);
      sliceStartTime.setSeconds(0);
      sliceStartTime.setMilliseconds(0);
      result.fcfs = [
        {
          "id": 0,
          "startTime": sliceStartTime,
          "endTime": new Date(sliceStartTime.valueOf() + 900 * 60 * 1000),
          "participantCount": 120,
          "prizeInfo": "string"
        }
      ]
    }
    else {
      result.draw = {
        "id": 0,
        "policies": [
          {
            "id": 0,
            "action": "WriteComment",
            "score": 10
          }
        ],
        "metadata": [
          {
            "id": 0,
            "grade": 1,
            "count": 10,
            "prizeInfo": "자동차 세트"
          },
          {
            "id": 0,
            "grade": 2,
            "count": 100,
            "prizeInfo": "미니 선풍기"
          }
        ]
      }
    }

    return [eventId, result];
  }) );
}

const dummyData = getEventsDetailMock();
let tempData = {};

const handlers = [
  http.post("/api/v1/admin/events", () => {
    tempData = {};
    return new HttpResponse(null, {status: 201});
  }),
  http.post("/api/v1/admin/events/temp", async ({ request }) => {
    tempData = await request.json();
    return new HttpResponse(null, {status: 201});
  }),
  http.get("/api/v1/admin/events/temp", () => {
    return HttpResponse.json(tempData);
  }),
  http.get("/api/v1/admin/events/:id", ({ params }) => {
    if( !dummyData.has(params.id) ) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(dummyData.get(params.id));
  }),
  http.post("/api/v1/admin/events/edit", async ({ request }) => {
    const data = await request.json();
    data.set(data.eventId, data);
    tempData = {};
    return new HttpResponse(null, {status: 200});
  }),
];

export default handlers;
