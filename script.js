// Je séléctionne mes éléments
const form = document.querySelector("form");
const liste = document.querySelector("ul");
const input = document.querySelector("form input");

// Je crée un tableau vide pour recevoir mes li
let toutesLesTaches = [];

// J'écoute l'événement submit pour prévoir la réaction par defaut et que la page ne se recharge pas automatiquement.
form.addEventListener("submit", (event) => {
	event.preventDefault();

	// je trim les valeurs ce qui permet d'enelever les espaces avant et aprés le texte
	const text = input.value.trim();
	// Si le texte est différent de chaine de caractere vide, alors je lis la fonction rajouterUneTache, puis je clean la valeur pour la remettre à 0.
	if (text !== "") {
		rajouterUneTache(text);
		input.value = "";
	}
});

// Je crée ma fonction rajouterUneTache, avec mon argument (texte)
function rajouterUneTache(text) {
	const todo = {
		text,
		// La méthode Date.now() renvoie le nombre de millisecondes écoulées depuis le premier janvier 1970.
		id: Date.now(),
	};
	// j'affiche la liste des taches
	afficherListe(todo);
}

// Je crée mac fonction afficherListe avec mon argument (todo)
function afficherListe(todo) {
	// je crée un 'li' que je place dans une constante 'item'
	const item = document.createElement("li");
	// je lui ajoute un attribut 'data-key' dans lequel je met l'id de ma const 'todo'
	item.setAttribute("data-key", todo.id);

	// Je crée un input
	const input = document.createElement("input");
	// Je lui ajoute un attribut 'type' dans lequel je met une checkbox
	input.setAttribute("type", "checkbox");
	// j'écoute l'événement click, et au click je lance la fonction 'tacheFaite'
	input.addEventListener("click", tacheFaite);
	// je rajoute a mon 'item' l'input que je viens de crée
	item.appendChild(input);

	// je crée mon element span qui contiendra le texte
	const txt = document.createElement("span");
	// je rajoute le texte a l'interieur
	txt.innerText = todo.text;
	// je rajoute le texte a mon itel (li)
	item.appendChild(txt);

	// je crée mon bouton
	const btn = document.createElement("button");
	// j'écoute l'événement 'click' et je lance la fonction 'supprimerTache'
	btn.addEventListener("click", supprimerTache);
	// je crée mon image de suppression
	const img = document.createElement("img");
	// je position l'attribut src et je lui met 'ressources/fermer.svg en valeur
	img.setAttribute("src", "ressources/delete.png");
	// je rajoute l'image a mon bouton
	btn.appendChild(img);
	// je rajoute le bouton a mon item
	item.appendChild(btn);

	// je rajoute mes item a ma liste de taches
	liste.appendChild(item);
	// j'aoute dans mon tableau vide 'toutesLesTaches' mes items
	toutesLesTaches.push(item);
}

// je crée ma fonction 'tacheFaite'
function tacheFaite(e) {
	e.target.parentNode.classList.toggle("finDeTache");
}

// je crée ma fonction 'supprimerTache'
function supprimerTache(e) {
	// je boucle sur toutes les taches du tableau.
	toutesLesTaches.forEach((el) => {
		// si le parent de l'evenement cible a comme attribut (data-key) le strictement le meme attribut que l'element en lui meme alors je supprime l'element avec la methode 'remove'
		if (
			e.target.parentNode.getAttribute("data-key") ===
			el.getAttribute("data-key")
		) {
			el.remove();
			// je boucle sur le tableau 'toutesLesTaches' pour les filtrer et demande a ce que le tableau ne concervent que les taches dont la data-key est differente de celle de l'element que l'on vient de supprimer
			toutesLesTaches = toutesLesTaches.filter(
				(li) => li.dataset.key !== el.dataset.key
			);
		}
	});
}
