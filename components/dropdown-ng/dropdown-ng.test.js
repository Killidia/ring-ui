import 'angular';
import 'angular-mocks';
import './dropdown-ng';

describe('DropdownNg', function () {
  let scope;
  let directiveScope;
  let element;
  let itemsMock;
  let $compile;

  beforeEach(window.module('Ring.dropdown'));

  /* global inject */
  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
    itemsMock = [
      {id: 1, name: 'test1'},
      {id: 2, name: 'test2'}
    ];
    scope.items = itemsMock;

    element = $compile('<button class="ring-btn" rg-dropdown items="items" on-item-select="onSelect" label-field="name"></button>')(scope);
    scope.$digest();
    directiveScope = element.isolateScope();
  }));

  const click = new CustomEvent('click');

  it('should pass items', function () {
    expect(directiveScope.items).to.equal(scope.items);
  });

  it('should render popup', function () {
    expect(directiveScope.getPopupMenuInstance()).to.be.defined;
  });

  it('should pass items to popup-menu', function () {
    expect(directiveScope.getPopupMenuInstance().props.data.length).to.equal(directiveScope.items.length);
  });

  it('should convert items on passing to popup-menu', function () {
    scope.items.push({id: 3, name: 'test3'});

    scope.$digest();

    expect(directiveScope.getPopupMenuInstance().props.data[0].label).to.equal(scope.items[0].name);
  });

  it('should show popup', function () {
    element[0].dispatchEvent(click);
    scope.$digest();

    expect(directiveScope.getPopupMenuInstance().isVisible()).to.equal(true);
  });

  it('should add dropdown-ng_open class to mark target as opened', function () {
    element[0].dispatchEvent(click);
    scope.$digest();

    element[0].should.have.class('dropdown-ng_open');
  });

  it('should remove dropdown-ng_open class to unmark target as opened', function () {
    element[0].dispatchEvent(click);
    scope.$digest();

    directiveScope.getPopupMenuInstance().close();

    element[0].should.not.have.class('dropdown-ng_open');
  });

  it('should defer popup render until items is loaded', inject(function ($q) {
    scope.items = $q.defer(); // eslint-disable-line angular/deferred
    scope.$digest();
    expect(directiveScope.getPopupMenuInstance()).not.to.be.defined;

    scope.items.resolve(itemsMock);
    scope.$digest();

    expect(directiveScope.getPopupMenuInstance()).to.be.defined;
  }));

  it('should not throw error if items is not defined but we show popup', function () {
    scope.items = null;
    element = $compile('<i class="ring-btn" rg-dropdown items="items"></i>')(scope);
    scope.$digest();
    directiveScope = element.isolateScope();

    expect(function () {
      element[0].dispatchEvent(click);
      scope.$digest();
    }).to.not.throw(Error);
  });
});
