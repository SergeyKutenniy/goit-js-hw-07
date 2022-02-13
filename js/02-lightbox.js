//  Cоздание галереи изображений с подключением библиотеки SimpleLightBox

import { galleryItems } from "./gallery-items.js";

//Создаем разметку с помощью деструктуризации

const makeGalleryItemMarkup = ({ preview, original, description }) => {
  return `<li>
                <a class="gallery__item" 
                   href="${original}">
                    <img class="gallery__image"
                        src="${preview}" 
                        alt="${description}"
                        data-source="${original}" />
                </a>
            </li>`;
};

//Обьединием в одну стору

const makeGalleryMarkup = galleryItems.map(makeGalleryItemMarkup).join("");

// Вешаем слушателя на ul

const galleryElements = document.querySelector(".gallery");

//Добавляем созданую разметку в ДОМ

galleryElements.insertAdjacentHTML("beforeend", makeGalleryMarkup);

// Подключаем Simplebox и делаем кастомные опции

new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
});
