export const fullName = (user) => {
    return user ? user.first_name + ' ' + user.surname : '';
};