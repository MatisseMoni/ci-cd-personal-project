// Validation des champs ici
const validateForm = (formData = {
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    ville: '',
    codePostal: ''
}) => {
    let newErrors = {};
    let formIsValid = true;

    // Validation du nom (exemple : non vide, sans caractères spéciaux et chiffres)
    if (!/^[a-zA-ZÀ-ÿ\-']+$/u.test(formData.nom.trim())) {
        formIsValid = false;
        newErrors.nom = "Le nom est invalide.";
    }

    // Validation du prénom (exemple : non vide, sans caractères spéciaux et chiffres)
    if (!/^[a-zA-ZÀ-ÿ\-']+$/u.test(formData.prenom.trim())) {
        formIsValid = false;
        newErrors.prenom = "Le prénom est invalide.";
    }

    // Validation de l'email (format)
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        formIsValid = false;
        newErrors.email = "L'email est invalide.";
    }

    // Validation de la date de naissance (âge >= 18)
    if (!formData.dateNaissance) {
        formIsValid = false;
        newErrors.dateNaissance = "La date de naissance est requise.";
    }

    const age = getAge(formData.dateNaissance); // Implémenter une fonction getAge pour calculer l'âge
    if (age < 18) {
        formIsValid = false;
        newErrors.dateNaissance = "Vous devez avoir au moins 18 ans.";
    }
    // Validation du code postal (format français)
    if (!/^(\d{5})?$/.test(formData.codePostal)) {
        formIsValid = false;
        newErrors.codePostal = "Le code postal est invalide.";
    }

    for (let key in formData) {
        if (!formData[key]) {
            newErrors[key] = "Ce champ est requis.";
            formIsValid = false;
        }
    }

    return {formIsValid, newErrors};
};

const getAge = (dateNaissance) => {
    if (!dateNaissance || isNaN(Date.parse(dateNaissance))) {
        return 0;
    }

    const birthDate = new Date(dateNaissance);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if the current date is before the birth month and day
    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};

export default validateForm;
export { getAge };