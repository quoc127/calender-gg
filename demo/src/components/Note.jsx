import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
export const Note = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer open={isOpen} onChangeValue={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Giải thích các câu hỏi</DrawerTitle>
          <DrawerDescription>
            <div className="grid grid-cols-3 gap-4 font-bold text-black">
              <div>
                1. Cấu trúc dữ liệu cho màn hình sẽ như sau:
                <pre className="whitespace-pre-wrap text-sm">
                  {`const initialEvents = [
  {
    id: 1,
    title: "First Session with Alex Stan",
    start: setEventDate("2025-02-07", 10, 30),
    end: setEventDate("2025-02-07", 11, 30),
    type: "event",
  },
  {
    id: 2,
    title: "First Session with Alex Stan",
    start: setEventDate("2025-02-07", 10, 30),
    end: setEventDate("2025-02-07", 11, 30),
    type: "appointment",
  },
];`}
                </pre>
                <ul>
                  <li>
                    - Backend nên trả về kiểu dữ liệu là JSON bởi vì JSON có cú
                    pháp đơn giản, rõ ràng, dễ hiểu, giúp FE dễ dàng xử lý hơn
                    vì cấu trúc tương tự Object, nhẹ hơn, được hỗ trợ ở nhiều
                    ngôn ngữ và thư viện
                  </li>
                </ul>
              </div>
              <div>
                2. Bởi vì em sử dụng thư viện &quot;rrule&quot; để xử lý việc
                lặp lại sự kiện nên nên cách xử lý ban đầu của em như sau:
                <pre className="whitespace-pre-wrap text-sm">
                  {`const initialEvents = [
  {
    id: 1,
    title: "First Session with Alex Stan",
    start: setEventDate("2025-02-07", 10, 30),
    end: setEventDate("2025-02-07", 11, 30),
    type: "appointment",
    "repeat": {
      "type": "weekly",
      "interval": 1,
      "end": "2025-06-30T10:00:00"
    }
  },
];`}
                </pre>
                Em sẽ kiểm tra xem sự kiện nào có chứa thuộc tính
                &quot;repeat&quot; thì sẽ xử lý lặp lại sự kiện và kiểm tra xem
                nó lặp lại theo tuần, tháng, năm, số lần lặp và ngày kết thúc.
              </div>
              <div>
                4. Dự án giúp em cải thiện kỹ năng từ thiết kế UI đến làm
                việc cơ sở dữ liệu, cải thiện UX/UI. Sử dụng React Calendar và
                FullCalendar để hiển thị lịch, tùy chỉnh giao diện theo yêu cầu.
                <hr className="my-4"/>
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
