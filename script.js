let json = [
    {
        bookId: 1,
        title: `Harry Potter and the Sorcerer's Stone`,
        authorName: `J.K. Rowling`

    },
    {
        bookId: 2,
        title: `Harry Potter and the Chamber of Secrets`,
        authorName: `J.K. Rowling`

    },
    {
        bookId: 3,
        title: `Harry Potter and the Prisoner of Azkaban`,
        authorName: `J.K. Rowling`

    },
    {
        bookId: 4,
        title: `Harry Potter and the Goblet of Fire`,
        authorName: `J.K. Rowling`

    },
    {
        bookId: 5,
        title: `Harry Potter and the Order of the Phoenix`,
        authorName: `J.K. Rowling`

    },
    {
        bookId: 6,
        title: `Harry Potter and the Half-Blood Prince`,
        authorName: `J.K. Rowling`

    },
    {
        bookId: 7,
        title: `Harry Potter and the Deathly Hallows`,
        authorName: `J.K. Rowling`

    },
    {
        bookId: 8,
        title: `The Magician's Nephew`,
        authorName: `C.S. Lewis`

    },
    {
        bookId: 9,
        title: `The Lion, the Witch, and the Wardrobe`,
        authorName: `C.S. Lewis`

    },
    {
        bookId: 10,
        title: `A Horse and His Boy`,
        authorName: `C.S. Lewis`

    },
    {
        bookId: 11,
        title: `Prince Caspian`,
        authorName: `C.S. Lewis`

    },
    {
        bookId: 12,
        title: `The Voyage of the Dawn Treader`,
        authorName: `C.S. Lewis`

    },
    {
        bookId: 13,
        title: `The Silver Chair`,
        authorName: `C.S. Lewis`

    },
    {
        bookId: 14,
        title: `The Last Battle`,
        authorName: `C.S. Lewis`

    },
    {
        bookId: 15,
        title: `Alice's Adventures in Wonderland`,
        authorName: `Lewis Carroll`

    },
    {
        bookId: 16,
        title: `Through the Looking-Glass`,
        authorName: `Lewis Carroll`

    },
    {
        bookId: 17,
        title: `The Hobbit`,
        authorName: `J.R.R. Tolkien`

    },
    {
        bookId: 18,
        title: `The Fellowship of the Ring`,
        authorName: `J.R.R. Tolkien`

    },
    {
        bookId: 19,
        title: `The Two Towers`,
        authorName: `J.R.R. Tolkien`

    },
    {
        bookId: 20,
        title: `The Return of the King`,
        authorName: `J.R.R. Tolkien`

    }
];

console.log(json);

function createListItems(data, numPerPage) {
    let numPages = Math.ceil(data.length / numPerPage);

    function createPageLink(inner, href) {
        let a = $('<a>');
        a.attr({
            class: 'page-link',
            href: href
        });
        a.html(inner);
        return a;
    }

    function createPageItem(inner) {
        let li = $('<li>');
        li.attr({
            class: 'page-item'
        });
        li.html(inner);
        return li;
    }

    function addPrevNextFunc(li) {
        li.on('click', function () {
            // Add active class to the current list item
            let activeIndex = $('.page-item.active > .page-link').html();
            let tabIndex = $('> .page-link', this).attr('tabindex');
            let newIndex = parseInt(activeIndex) + parseInt(tabIndex) + 1;
            $('.page-item').removeClass('active');
            $(`.pagination > li:nth-child(${newIndex})`).addClass('active');
        })
    }

    // Create Previous nav button
    let aPrev = createPageLink(`<`, `#`);
    aPrev.attr('tabindex',-1);
    let liPrev = createPageItem(aPrev);
    addPrevNextFunc(liPrev);
    liPrev.addClass('disabled');
    $('.pagination').prepend(liPrev);

    // Create nav button for each page
    for (let i = 0; i < numPages; i++) {
        let a = createPageLink(i + 1, `#`);
        let li = createPageItem(a);
        li.on('click', function () {
            $('.page-item').removeClass('active');
            $(this).addClass('active');
        })
        $('.pagination').append(li);
    }

    // Add active class to first list item
    $('.pagination > li:nth-child(2)').addClass('active')

    // Create Next nav button
    let aNext = createPageLink(`>`, `#`);
    aNext.attr('tabindex',1);
    let liNext = createPageItem(aNext);
    addPrevNextFunc(liNext);
    $('.pagination').append(liNext);

}

createListItems(json, 6);