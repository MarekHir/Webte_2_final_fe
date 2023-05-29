export default {
    title: 'Dashboard',
    student: {
        assigned: {
            title: 'Last assigned exercises',
            more: 'Show all assigned exercises',
            none: 'You have no assigned exercises'
        },
        solved: {
            title: 'Last solved exercises',
            more: 'Show all solved exercises',
            none: 'You have not solved any exercises yet'
        },
        graph: {
            title: 'Student results',
            assigned: 'Assigned exercises',
            solved: 'Solved exercises',
            points: 'Points',
            earned_points: 'Earned points',
            total_points: 'Total points',
            average_point: 'Student\'s average',
            average_total: 'Exercises average',
            none: 'No student results data available'
        }
    },
    teacher: {
        exercises_lists: {
            title: 'Exercises lists',
            total_generated: 'Generated exercises',
            total_solved: 'Solved exercises',
            solved_average: 'Average points',
            more: 'Show all exercises lists',
            none: 'You have not created any exercises lists yet'
        },
        exercises: {
            title: 'Latest exercises updates',
            more: 'Show all exercises',
            none: 'No exercises were generated yet'
        },
        graph: {
            title: 'Statistics',
            generated_title: 'Generated exercises per exercise list',
            average_title: 'Average points per exercise list',
            top_students: 'Top 5 students',
            none: 'No statistics data available'
        }
    },
    admin: {
        new: {
            title: 'Latest new users',
            none: 'No new users were registered yet',
        },
        updated: {
            title: 'Latest updated users',
            none: 'No users were updated yet',
        },
        graph: {
            title: 'Statistics',
            types_title: 'Users by type',
            counts_title: 'Counts of records',
            records: 'Records',
            types: {
                'exercises': 'Exercises',
                'exercises_lists': 'Exercise lists',
                'instructions': 'Instructions',
            }
        }
    }
}