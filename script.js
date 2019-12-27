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

displayResults(json.slice(0,6));

function displayResults(data) {
    function createTD(inner) {
        let td = $('<td>');
        td.html(inner);
        return td;
    }

    function createTR(array) {
        let tr = $('<tr>');
        array.forEach(element => {
            tr.append(element);
        })
        return tr;
    }

    data.forEach(element => {
        let tdBookId = createTD(element.bookId);
        let tdTitle = createTD(element.title);
        let tdAuthorName = createTD(element.authorName);
        let tr = createTR([tdBookId,tdTitle,tdAuthorName]);
        $('.table').append(tr);
    })
}

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

    function handleActiveDisabled(newActiveItem) {
        $('.page-item').removeClass('active');
        newActiveItem.addClass('active');

        let activeIndex = parseInt($('.page-item.active > .page-link').html());
        $('.page-item').removeClass('disabled');
        if (activeIndex == 1) {
            $(`.pagination > li:nth-child(${activeIndex})`).addClass('disabled');
        }
        else if (activeIndex == numPages) {
            $(`.pagination > li:nth-child(${activeIndex + 2})`).addClass('disabled');
        }
    }

    function handleResults() {
        $('tbody').empty();
        let activeIndex = parseInt($('.page-item.active > .page-link').html());
        let multiplier = activeIndex - 1;
        let start = multiplier * numPerPage;
        let end = Math.min(data.length, start + 6);
        console.log(start,end);
        displayResults(data.slice(start,end));
    }

    // Create nav button for each page
    for (let i = 0; i < numPages; i++) {
        let a = createPageLink(i + 1, `#`);
        let li = createPageItem(a);
        li.on('click', function () {
            handleActiveDisabled($(this));
            handleResults();
        })
        $('.pagination').append(li);
    }

    // Add active class to first list item
    $('.pagination > li:nth-child(1)').addClass('active')

    function addPrevNextFunc(li) {
        li.on('click', function () {
            if (li.attr('class') !== 'page-item disabled') {
                // Add active class to the current list item
                let activeIndex = parseInt($('.page-item.active > .page-link').html());
                let tabIndex = parseInt($('> .page-link', this).attr('tabindex'));
                let newIndex = activeIndex + tabIndex + 1;
                handleActiveDisabled($(`.pagination > li:nth-child(${newIndex})`));
                handleResults();
            }
        })
    }

    // Create Previous nav button
    let aPrev = createPageLink(`<`, `#`);
    aPrev.attr('tabindex', -1);
    let liPrev = createPageItem(aPrev);
    addPrevNextFunc(liPrev);
    liPrev.addClass('disabled');
    $('.pagination').prepend(liPrev);

    // Create Next nav button
    let aNext = createPageLink(`>`, `#`);
    aNext.attr('tabindex', 1);
    let liNext = createPageItem(aNext);
    addPrevNextFunc(liNext);
    $('.pagination').append(liNext);

}

createListItems(json, 6);