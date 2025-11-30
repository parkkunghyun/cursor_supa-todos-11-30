# Supabase + Next.js Todo CRUD 템플릿

Supabase와 Next.js 14 (App Router)를 사용한 Todo CRUD 애플리케이션 템플릿입니다.

## 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **Supabase** (Database & Backend)
- **TailwindCSS** (Styling)

## 프로젝트 구조

```
.
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET, POST (전체 조회, 생성)
│   │       └── [id]/
│   │           └── route.ts      # PUT, DELETE (수정, 삭제)
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 페이지
├── components/
│   ├── TodoForm.tsx              # Todo 입력 폼
│   ├── TodoItem.tsx              # Todo 아이템 (토글, 삭제)
│   └── TodoList.tsx              # Todo 목록
├── lib/
│   └── supabase.ts               # Supabase 클라이언트 설정
├── supabase/
│   └── schema.sql                # 데이터베이스 스키마
└── package.json
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 설정에서 URL과 Anon Key 복사
3. `.env.local.example`을 `.env.local`로 복사
4. `.env.local`에 Supabase 정보 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 데이터베이스 테이블 생성

Supabase 대시보드의 SQL Editor에서 `supabase/schema.sql` 파일의 내용을 실행하세요.

또는 Supabase CLI를 사용하는 경우:

```bash
supabase db push
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 기능

- ✅ Todo 추가
- ✅ Todo 목록 조회
- ✅ Todo 완료/미완료 토글
- ✅ Todo 삭제
- ✅ 실시간 UI 업데이트

## API 엔드포인트

### GET `/api/todos`
모든 Todo 조회

### POST `/api/todos`
새 Todo 생성
```json
{
  "title": "할 일 내용"
}
```

### PUT `/api/todos/[id]`
Todo 수정
```json
{
  "completed": true,
  "title": "수정된 제목" // 선택사항
}
```

### DELETE `/api/todos/[id]`
Todo 삭제

## 데이터베이스 스키마

```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

## 배포

### Vercel 배포

1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 환경 변수 설정 (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
4. 배포 완료!

## 라이선스

MIT

