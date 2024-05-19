angular.module('buttonApp', []).controller('buttonController', function ($scope) {
    $scope.btnt = {
        undef: { label: null, modalLabel: null, act: null },
        contract: { label: 'R$ 150,00', modalLabel: 'Você quer contratar?', act: 'contract' },
        cancel: { label: 'Cancelar', modalLabel: 'Você quer cancelar?', act: 'cancel' },
        install: { label: 'Instalar', modalLabel: 'Você quer instalar?', act: 'install' },
        installing: { label: 'Instalando...', act: 'installing', },
        uninstall: { label: 'Desinstalar', modalLabel: 'Você quer desinstalar?', act: 'uninstall' },
        uninstalling: { label: 'Desinstalando...', act: 'uninstalling' },
        open: { label: 'Abrir', modalLabel: 'Você quer abrir?', act: 'open' }
    }

    $scope.btn = { center: $scope.btnt.contract, left: $scope.btnt.undef, right: $scope.btnt.undef };

    $scope.st = {
        appHasSubscription: true,
        termHasSubscription: false,
        termInGracePeriod: false,
        isInstalled: false,
        modalType: null,
        modalLabel: null
    }

    logDebug = function (msg) {
        setTimeout(function () {
            console.debug(`##### ${msg}`);
        }, 1);
    }

    logInfo = function (msg) {
        setTimeout(function () {
            console.info(`##### ${msg}`);
        }, 1);
    }

    $scope.handleModal = function (modalType) {
        logDebug(`Openning askModal: ${modalType}!`);

        try {
            var btn = $scope.btnt[modalType];
            if (btn.modalLabel) {
                $scope.st.modalType = btn.act;
                $scope.st.modalLabel = btn.modalLabel;
                document.getElementById('askModal').style.display = "block";
            }
        } catch (ignore) {
        }
    }

    $scope.confirm = function (confirm) {
        if ($scope.st.modalType) {
            if (confirm) {
                switch ($scope.st.modalType) {
                    case "contract":
                        $scope.st.termHasSubscription = true;
                        buttonAction(false);
                        break;
                    case "cancel":
                        $scope.st.termHasSubscription = false;
                        $scope.toggleGracePeriod();
                        buttonAction(false);
                        break;
                    case "install":
                    case "uninstall":
                        buttonAction(true);
                        break;
                    default:
                        break;
                }
            }

            logDebug(`Closing askModal: ${$scope.st.modalType}!`);
            document.getElementById('askModal').style.display = "none";
            $scope.st.modalType = null;
            $scope.st.modalLabel = null;
        }
    }

    $scope.togglePaidApp = function () {
        $scope.st.appHasSubscription = !$scope.st.appHasSubscription;
        logDebug(`appHasSubscription=${$scope.st.appHasSubscription}`);
        buttonAction(false);
    }

    $scope.toggleGracePeriod = function () {
        $scope.st.termInGracePeriod = !$scope.st.termInGracePeriod;
        logDebug(`termInGracePeriod=${$scope.st.termInGracePeriod}`);
        buttonAction(false);
    }

    buttonAction = function (isTransient) {
        buttonSelect(isTransient);

        if (isTransient) {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.st.isInstalled = !$scope.st.isInstalled;
                    buttonSelect(false);
                });
            }, 1000);
        }
    }

    buttonNoSubscriptionSelect = function (btn, isTransient) {
        if (!$scope.st.isInstalled) {
            btn.center = (isTransient ? $scope.btnt.installing : $scope.btnt.install);
        } else {
            btn.left = (isTransient ? $scope.btnt.uninstalling : $scope.btnt.uninstall);
            btn.right = $scope.btnt.open;
        }

        logInfo(`<buttonNoSubscriptionSelect=${JSON.stringify(btn)}/>`);

        return btn;
    }

    buttonHasSubscriptionSelect = function (btn, isTransient) {
        if (!$scope.st.isInstalled) {
            if (!$scope.st.termHasSubscription) {
                btn.center = $scope.btnt.contract;
            } else {
                btn.left = $scope.btnt.cancel;
                btn.right = (isTransient ? $scope.btnt.installing : $scope.btnt.install);
            }
        } else {
            if (!$scope.st.termHasSubscription) {
                btn.left = (isTransient ? $scope.btnt.uninstalling : $scope.btnt.uninstall);
                btn.right = $scope.btnt.contract;
            } else {
                btn.left = $scope.btnt.cancel;
                btn.right = $scope.btnt.open;
            }
        }

        logInfo(`<buttonHasSubscriptionSelect=${JSON.stringify(btn)}/>`);

        return btn;
    }

    buttonSelect = function (isTransient) {
        const btn = {
            center: $scope.btnt.undef,
            left: $scope.btnt.undef,
            right: $scope.btnt.undef
        };

        logInfo(`<buttonSelect isTransient=${isTransient}>`);

        if (!$scope.st.appHasSubscription || $scope.st.termInGracePeriod) {
            $scope.btn = buttonNoSubscriptionSelect(btn, isTransient);
        } else {
            $scope.btn = buttonHasSubscriptionSelect(btn, isTransient);
        }

        logInfo('</buttonSelect>');
    }
})