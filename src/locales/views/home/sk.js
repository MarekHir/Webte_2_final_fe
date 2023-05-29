export default {
    title: 'Dashboard',
    student: {
        assigned: {
            title: 'Posledné priradené cvičenia',
            more: 'Zobraziť všetky priradené cvičenia',
            none: 'Nemáte žiadne priradené cvičenia'
        },
        solved: {
            title: 'Posledné vyriešené cvičenia',
            more: 'Zobraziť všetky vyriešené cvičenia',
            none: 'Zatiaľ ste nevyriešili žiadne cvičenia'
        },
        graph: {
            title: 'Výsledky študenta',
            assigned: 'Priradené cvičenia',
            solved: 'Vyriešené cvičenia',
            points: 'Body',
            earned_points: 'Získané body',
            total_points: 'Celkové body',
            average_point: 'Priemerné body študenta',
            average_total: 'Priemer cvičení',
            none: 'Žiadne dostupné dáta o výsledkoch študenta'
        }
    },
    teacher: {
        exercises_lists: {
            title: 'Zoznamy cvičení',
            total_generated: 'Vygenerované cvičenia',
            total_solved: 'Vyriešené cvičenia',
            solved_average: 'Priemer bodov',
            more: 'Zobraziť všetky zoznamy cvičení',
            none: 'Zatiaľ ste nevytvorili žiadne zoznamy cvičení'
        },
        exercises: {
            title: 'Najnovšie aktualizácie cvičení',
            more: 'Zobraziť všetky cvičenia',
            none: 'Zatiaľ neboli vygenerované žiadne cvičenia'
        },
        graph: {
            title: 'Štatistiky',
            generated_title: 'Počet vygenerovaných cvičení podľa zoznamu cvičení',
            average_title: 'Priemer bodov podľa zoznamu cvičení',
            top_students: 'Top 5 študentov',
            none: 'Žiadne dostupné štatistické údaje'
        }
    },
    admin: {
        new: {
            title: 'Najnovší registrovaní užívatelia',
            none: 'Zatiaľ neboli zaregistrovaní žiadni noví užívatelia',
        },
        updated: {
            title: 'Najnovšie aktualizovaní užívatelia',
            none: 'Zatiaľ neboli aktualizovaní žiadni užívatelia',
        },
        graph: {
            title: 'Štatistiky',
            types_title: 'Užívatelia podľa typu',
            counts_title: 'Počty záznamov',
            records: 'Záznamy',
            types: {
                'exercises': 'Cvičenia',
                'exercises_lists': 'Zoznamy cvičení',
                'instructions': 'Inštrukcie',
            }
        }
    }
}