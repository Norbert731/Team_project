# Projekt grupowy

Cel: Stworzenie menedżera do zarządzania pracownikami

Funkcjonalności:

1. Rejestracja
2. Logowanie na platforme
3. Dodawanie pracownika
4. Edytowanie osób w liscie
5. Usuwanie osób z listy
6. Wyszukiwarka

# Informacje dla developerów

- Visual studio 2022, wersja 17.5.2
- SDK 7.0.202 (można sprawdzić wpisując w termial "dotnet --list-sdks")
- SSMS developer server 2022
- SMSS studio 19.0.2
- Baza danych "./Database", żeby ustawić baze poprawnie trzeba w SSMS wyłączyć opcje która nie pozwala zmienić tablic
	Tools > Options > Designers > Prevent saving changes that require table re-creation
	Następnie można wejśc w tablice klikając prawym i wybierając opcje Design, następnie Identity Specification > Is 		Identity zmieniamy na Yes i zapisujemy