# Поиск по PDF-книгам

Инструмент для сверки формулировок и номеров страниц: Node.js + `pdfjs-dist`.

## Установка

Зависимости уже установлены; при переустановке:

```
pnpm --dir tools/pdf install
```

## Использование

Поиск фразы (регистр не важен):

```
node tools/pdf/search.mjs "Books/Zorich MatAnaliz 1.pdf" "Архимеда"
```

Показать текст страницы целиком (нумерация PDF-страниц):

```
node tools/pdf/search.mjs "Books/Zorich MatAnaliz 1.pdf" --page 80
```

Метаданные и оглавление:

```
node tools/pdf/search.mjs "Books/Zorich MatAnaliz 1.pdf" --meta
node tools/pdf/search.mjs "Books/Zorich MatAnaliz 1.pdf" --outline
```

Отрендерить страницу в PNG — для сканов без текстового слоя:

```
node tools/pdf/render.mjs "Books/Курс дифференц. и интегр. исчисления. Т.1._Фихтенгольц_2003, 680с.pdf" 50 page.png 1.0
```

PNG здесь — временный файл для просмотра, а не чертёж проекта.

В книгах Зорича нумерация PDF-страниц совпадает с печатной — проверено на с. 79–81.
Предупреждения pdf.js про шрифты и canvas не мешают извлечению текста.
