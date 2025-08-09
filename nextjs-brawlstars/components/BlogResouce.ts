interface BlogResource {
    id: string;
    title: string;
    date: string;
}

const resources: BlogResource[] = [
    {
        "id": "1",
        "title": "신규 브롤러 팽, 그 성능은?",
        "date": "2022-02-08",
    },
    {
        "id": "2",
        "date": "2022-02-10",
        "title": "2월초 인기 있는 모드는 무엇일까요?",
    },
    {
        "id": "3",
        "date": "2022-02-16",
        "title": "2월 인기있는 브롤러는 무엇일까요?",
    }
];

export default resources;
export type { BlogResource };