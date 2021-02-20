Aplikacja jest sklepem internetowym. Podczas tworzenia projektu został użyty po stronie frontendu : React-redux, redux-thunk, redux-form oraz wiele innych zaawanoswanych konceptów. Za backend odpowiada node.js, który połączony jest z bazą danych MongoDB. Do autoryzacji użytkowników został użyty Firebase, który odpowiada za generowanie tokenów potrzebnych do logowania, rejestrowania, resetowania haseł itd. Otrzymany token następnie przetwarzany jest przez mój backend i na jego podstawie użytkownikowi, który loguje się do aplikacji przyznawana jest rola: admina luż usera. W momencie przyznania roli admina aplikacja przekierwuje go do panelu admina, gdzie możemy: dodawać, edytować, usuwać produkty, tworzyć podkategorię i kategorię do produktów, resetować hasła.

Kiedy loguje się do aplikacji jako user:

- nie mam dostępu do panelu admina, ponieważ użytkownik ma role: 'user'
- użytkownik ma dostęp do swojego panelu, który posiada historię zakupów oraz liste życzeń 
- ocenić produkt na podstawie gwiazdek (1 do 5)

Kiedy loguje się jako admin:
- mam dostęp do panelu admina
- mogę zarządzać produktami (CRUD operacje) 
- zmieniać status przesyłek zakupionych przez użytkowników rzeczy

Docelowo aplikacja będzie umożliwiała dodatkowo:

- możliwość komunikacji z adminem na czacie

Aby uruchomić projekt wystarczy wykonać następujące kroki:

a) Klonujemy repozytorium: git clone https://github.com/Versatiledd/React--eccomerce.git
b) Po pobraniu wchodzimy do folderu w którym znajdują się pliki aplikacji: cd React--eccomerce
c) Wchodzimy do folderu 'client' i w terminalu wpisujemy npm install
d) Wchodzimy do folderu 'server' i w teminalu wpisujemy npm install
d) Po instalacji otwieramy dwa oddzielne terminale i wpisujemy npm start
