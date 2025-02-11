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
                    ngôn ngữ và thư viện.
                  </li>
                </ul>
              </div>
              <div>
                2. Cách em sử dụng là phương pháp thủ công, tức là nhập các sự
                kiện lập lại vào từng ngày mong muốn. Sau khi đã thêm sự kiện
                thì em sẽ gọi API get evnets để lấy danh sách các sự kiện và
                hiển thị ra giao diện.
              </div>
              <div>
                4. Dự án giúp em cải thiện kỹ năng lập trình FE và BE với dự án
                Google-Calendar, từ việc thiết kế UI, cơ sở dữ liệu, cải thiện
                trải nghiệm người dùng. Sử dụng React Calendar và FullCalendar
                để hiển thị lịch, tùy chỉnh giao diện theo yêu cầu.
                <hr className="my-4" />
                5. Nếu làm tiếp dự án thì em sẽ tìm hiểu và thêm tính năng gửi
                thông báo cho người dùng biết khi nào sự kiện sẽ diễn ra trước
                3-5 phút.
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
