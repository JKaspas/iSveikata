package lt.vtvpmc.ems.isveikata.icd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class IcdService {

    @Autowired
    private JpaIcdRepository jpaIcdRepository;
}
